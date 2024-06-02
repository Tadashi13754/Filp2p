const fs = require('fs');
const path = require('path');
const { execute } = require("../utils");

exports.prepare_files = async(inputPath, outputPath, fileJSONPath) =>{
    const files = await fs.promises.readdir(inputPath)
    if(files.length === 0) {
        return
    }
    const car = await execute(
        `./generate-car --single -i ${inputPath} -o ${outputPath} -p ${inputPath}`
    )
    const jsonResponse = JSON.parse(car)
    const carSize = await execute(
        `stat --format="%s" ${outputPath}/${jsonResponse['PieceCid']}.car`
    )
    const fileRecord = {
        carSize: parseInt(carSize.trim()),
        pieceCid: jsonResponse['PieceCid'],
        pieceSize: jsonResponse['PieceSize'],
        payloadCid: jsonResponse['DataCid'],
        contains: jsonResponse['CidMap'],
        dealInfo: null,
        dealInitiated: false,
        createdAt: Date.now(),
    }

    if (!fs.existsSync(fileJSONPath)) {
        fs.writeFileSync(fileJSONPath, JSON.stringify([]));
    }

    const tempData = JSON.parse(fs.readFileSync(fileJSONPath))
    tempData.push(fileRecord)
    fs.writeFileSync(fileJSONPath, JSON.stringify(tempData, null, 2))
    await execute(
        `rm ${inputPath}/*`
    )
    return fileRecord
}

exports.move_to_staging = async(folderPath, stagingFilePath) =>{
    const files = await fs.promises.readdir(folderPath);
    const elementsToRemove = ['filp2p-init', 'filp2p-staging', 'filp2p-car', 'filp2p-downloads'];
    const filteredFiles = files.filter(file => !elementsToRemove.includes(file))
    await Promise.all(filteredFiles.map(async (file) => {
        const oldPath = path.join(folderPath, file);
        const newPath = path.join(stagingFilePath, file);
        await fs.promises.rename(oldPath, newPath);
    }))
}
