## To begin development you need to install everything
#
### Do not install --save
#
### Root directory
```bash
  npm install
```
#
###  app-src directory
```bash
  npm install;
```
#
## In app-src run. This will start the dev server on 8000
```bash
  npm start
```
#
### In root run
```bash
  npm run rollup
```
#
## Add a tag to the branch, this is required for the workflow to run. (patch,minor,major)
```bash
  git tag -a patch -m "Describe your feature/fix"
```
#
## push your code with the tag
```bash
  git push origin branchName -tags
```
#
### If you add new dependencies make sure to add them to the package.json in the root
#
