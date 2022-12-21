module.exports = async ({github, context}) => {
  console.log('github issues',github.rest.issues);
  const getLabel = github.rest.issues.getLabel;
  var label = await getLabel({"owner":"grant350","name":"patch","repo":"kuberform"});
  console.log('label',label);
  //context.issues
  //rest,request
  // console.log('context',context);
  // https://api.github.com/repos/foo/bar/issues
  return github;
}