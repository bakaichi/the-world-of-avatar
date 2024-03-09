export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    a: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "a",
      password: "a"
    },
    admin: {
      firstName: "Admin",
      lastName: "Administrator",
      email: "admin@admin.com",
      password: "admin",
      role: "admin"
    }
  },
  nations: {
    _model: "Nation",
    fire : {
      title: "Fire Nation"
    },
    earth: {
      title: "Earth Kingdom"
    },
    water: {
      title: "Water Tribes"
    },
    air: {
      title: "Air Temples"
    }
  },
  characters: {
    _model: "Character",
    zuko: {
      name: "Zuko"
    },
    azula: {
      name: "Azula"
    },
    "katara": {
      "name": "Katara"
    },
    "fire lord ozai": {
      "name": "Fire Lord Ozai"
    },
    "aang": {
      "name": "Aang"
    },
    "sokka": {
      "name": "Sokka"
    }
  }
};
