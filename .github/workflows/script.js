module.exports = ({github, context}) => {
  console.log('github context',github.issues);
  // console.log('context',context);
  // https://api.github.com/repos/foo/bar/issues
  return github;
}