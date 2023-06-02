module.exports = {
  client: {
    includes: ["./screens/*.{tsx,ts}", "./fragments.ts"],
    tagName: "gql",
    service: {
      name: 'backend',
      url: "https://instaclone-backend-neverlish.herokuapp.com/graphql",
    }
  }
}