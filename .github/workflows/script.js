module.exports = ({github, context}) => {
  console.log('github issues',github.rest.issues);
  const getLabel = github.rest.issues.getLabel;
  var label = getLabel({"owner":"grant350","labels":["patch"],"repo":"kuberform"});
  //context.issues
  //rest,request
  // console.log('context',context);
  // https://api.github.com/repos/foo/bar/issues
  return github;
}