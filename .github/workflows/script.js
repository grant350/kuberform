module.exports = async ({github, context}) => {
  console.log('github issues',github.rest.issues.events);
  var getIssues = github.rest.issues.listEvents;

  //context.issues
  //rest,request
  console.log('getIssues',getIssues({owner:"grant350",repo:"kuberform",page:1,per_page:5}));
  // https://api.github.com/repos/foo/bar/issues
  return github;
}