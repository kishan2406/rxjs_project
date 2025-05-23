export class GitHubUser {
    constructor(
      public avatar_url: string,
      public events_url: string,
      public followers_url: string,
      public following_url: string,
      public gists_url: string,
      public gravatar_id: string,
      public html_url: string,
      public id: number,
      public login: string,
      public node_id: string,
      public organizations_url: string,
      public received_events_url: string,
      public repos_url: string,
      public score: number,
      public site_admin: boolean,
      public starred_url: string,
      public subscriptions_url: string,
      public type: string,
      public url: string,
      public user_view_type: string
    ) {}
  }
  