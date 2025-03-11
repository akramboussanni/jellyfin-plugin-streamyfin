const fs = require('fs');

const VERSION = process.env.VERSION;

// Read csproj
const csprojPath = './Jellyfin.Plugin.Streamyfin/Jellyfin.Plugin.Streamyfin.csproj';
if (!fs.existsSync(csprojPath)) {
    console.error('Jellyfin.Plugin.Streamyfin.csproj file not found');
    process.exit(1);
}

// Read the .csproj file
fs.readFile(csprojPath, 'utf8', (err, data) => {
    if (err) {
        return console.error('Failed to read .csproj file:', err);
    }

    let newAssemblyVersion = null;
    let newFileVersion = null;

    // Use regex to find and increment versions
    const updatedData = data.replace(/<AssemblyVersion>(.*?)<\/AssemblyVersion>/, (match, version) => {
        newAssemblyVersion = VERSION;
        return `<AssemblyVersion>${newAssemblyVersion}</AssemblyVersion>`;
    }).replace(/<FileVersion>(.*?)<\/FileVersion>/, (match, version) => {
        newFileVersion = VERSION;
        return `<FileVersion>${newFileVersion}</FileVersion>`;
    });;

    // Write the updated XML back to the .csproj file
    fs.writeFile(csprojPath, updatedData, 'utf8', (err) => {
        if (err) {
            return console.error('Failed to write .csproj file:', err);
        }
        console.log('Version incremented successfully!');

        // Write the new versions to GitHub Actions environment files
        // fs.appendFileSync(process.env.GITHUB_ENV, `NEW_ASSEMBLY_VERSION=${newAssemblyVersion}\n`);
        // fs.appendFileSync(process.env.GITHUB_ENV, `NEW_FILE_VERSION=${newFileVersion}\n`);
    });
});

