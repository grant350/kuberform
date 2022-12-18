## To begin development you need to install everything
#
### Do not install --save
#
### / directory
```bash
  npm install
```
#
### app-src directory
```bash
  npm install;
```
#
## Change your directory to app-src and run
```bash
  npm start
```
#
### Once youve started the development server you can see the live changes on port 8000
#
### When you are done making changes to the project save your changes and cd into the root and run
```bash
  npm run rollup
```
### This will compile just the formbuilder folder, this saves space in the actual package

## When you have compiled the project push your changes and make a PullRequest
#
### If you add new dependencies make sure to add them to the package.json in the root
#
## Things to work on
#
### fix eslint errors
### set up typescript
### make auto deploy using npmjs apikey
### make more example forms and include containers for adding and removing children
### make simple site for using kuberform
