module.exports = ({github, context}) => {
  console.log('github issues',github.rest.issues);
  //context.issues
  //rest,request
  // console.log('context',context);
  // https://api.github.com/repos/foo/bar/issues
  return github;
}