const commonFields = `
  url
  title
  state
  number
  createdAt
  author {
    url
    login
    avatarUrl
  }
  labels(first: 10) {
    edges {
      node {
        name
        color
      }
    }
  }
  repository {
    nameWithOwner
    url
  }
  comments {
    totalCount
  }
`;

const issueFragment = `
  fragment IssueFragment on Issue {
    ${commonFields}
  }`;

const pullRequestFragment = `
  fragment PullRequestFragment on PullRequest {
    ${commonFields}
    mergeable
    reviews {
      totalCount
    }
    commits(last: 1) {
      nodes {
        commit {
          status {
            state
          }
          checkSuites(first: 1) {
            nodes {
              status
              conclusion
              app {
                name
              }
            }
          }
        }
      }
    }
  }`;

export const makeQuery = (filterString: string) => `
  ${pullRequestFragment}
  ${issueFragment}
  query results {
    search(query: "${filterString}", type: ISSUE, first: 100) {
      edges {
        node {
          __typename
          ... on PullRequest {
            ...PullRequestFragment
          }
          ... on Issue {
            ...IssueFragment
          }
        }
      }
    }
  }`;
