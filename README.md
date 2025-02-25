# How to Run the AZIT Consult Website
## Prerequisites

**Visual Studio Code installed** 
**Live Server extension for VS Code installed**
**Git installed**
**Modern web browser (Chrome, Firefox, Edge, etc.)**

## Steps

### 1 Clone the repository
bashCopygit clone https://github.com/asukulu/##########.git

### 2 Navigate to the project directory
bashCopycd ##########

### 3 Open the project in Visual Studio Code
bashCopycode .
Or manually open VS Code and use File > Open Folder to navigate to the project directory.
### 4 nstall dependencies (if applicable)
If the project uses npm or yarn for dependencies:
bashCopynpm install
or
bashCopyyarn install

### 5 Configure any environment variables (if necessary)
Check if there's a .env.example file that needs to be copied to .env and configured.
### 6 Make sure Live Server extension is installed

Open VS Code Extensions view (Ctrl+Shift+X or Cmd+Shift+X on Mac)
Search for "Live Server" by Ritwick Dey
Click Install if not already installed


### 7 Check file permissions
Ensure all files have the correct read/write permissions.
### 8 Verify project structure
Make sure the project structure is intact with all necessary HTML, CSS, JavaScript, and asset files.
### 9 Start the development server
Right-click on index.html in the VS Code file explorer and then click on 'Open with Live Server'
### 10 Access the website
The website will automatically open in your default browser at a URL like:
Copyhttp://127.0.0.1:5500/index.html
or
Copyhttp://localhost:5500/index.html


## Troubleshooting

If Live Server doesn't start, check if port 5500 is already in use
If resources aren't loading, check browser console (F12) for path errors
For CORS issues, you may need to adjust the Live Server settings
If you encounter JavaScript errors, make sure all script files are properly linked

Additional Information

The website is static and doesn't require a backend server
Any changes made to the HTML, CSS, or JavaScript files will automatically refresh in the browser while Live Server is running