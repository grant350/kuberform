module.exports = async ({github, context}) => {
  console.log('github issues',github.rest.issues.events);
  const getIssues = github.rest.issues.events;

  //context.issues
  //rest,request
  console.log('getIssues',getIssues({repo:"kuberform",owner:"grant350"}));
  // https://api.github.com/repos/foo/bar/issues
  return github;
}