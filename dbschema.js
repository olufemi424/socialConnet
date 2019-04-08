let db = {
  users: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2019-04-05T22:23:04.689Z",
      imageUrl: "image/dsfdjfhdfjdlkfd/dfjdkfhd.png",
      bio: "Hello, my name is bio",
      website: "http://olufemiaf.com",
      location: "Chicago, US"
    }
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is a simple scream",
      createdAt: "2019-04-05T22:23:04.689Z",
      likedCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "kdjsfgdksuufhgkdsufky",
      body: "nice one mate!",
      createdAt: "2019-03-15T10:59:52.798Z"
    }
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "kdjsfgdksuufhgkdsufky",
      type: "like | comment",
      createdAt: "2019-03-15T10:59:52.798Z"
    }
  ]
};

const userDetails = {
  // redux data
  credentials: {
    userId: "453DFGDRGDHFSGHYFHFGHHG",
    email: "olufemiaf@gmail.com",
    handle: "olufemi",
    createdAt: "2019-04-05T22:23:04.689Z",
    imageUrl: "image/dsfdjfhdfjdlkfd/dfjdkfhd.png",
    bio: "Hello, my name is bio",
    website: "http://olufemiaf.com",
    location: "Chicago, US"
  },
  likes: [
    {
      userHandle: "olufemi",
      screamId: "43y54ytghrthgy45yht4hg"
    },
    {
      userHandle: "olufemi",
      screamId: "rt54t45tyyt3ghr4yhfbf5"
    }
  ]
};
