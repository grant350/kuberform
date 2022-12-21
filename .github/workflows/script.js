module.exports = ({github, context}) => {
  console.log('github issues',Object.keys(github));
  //context.issues
  // console.log('context',context);
  // https://api.github.com/repos/foo/bar/issues
  return github;
}