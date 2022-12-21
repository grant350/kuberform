module.exports = async ({github, context}) => {
  console.log('github issues',github.rest.issues.events);
  const getIssues = github.rest.issues.listEvents;

  //context.issues
  //rest,request
  console.log('getIssues',getIssues({owner:"grant350",repo:"kuberform"}));
  // https://api.github.com/repos/foo/bar/issues
  return github;
}