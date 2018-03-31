const config = {
  "ownerID": "255009837002260482",

  "admins": ["209609796704403456", "260107579366047744"],
  
  "defaultSettings" : {
    "prefix": "?",
    "goodcolor": "#00ff00",
    "badcolor": "#ff0000",
    "delete": true
  },
 
 
  permLevels: [
    { level: 1,
      name: "User", 
      check: () => true
    },
    { level: 2,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
    { level: 3,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
    { level: 4,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};
 
module.exports = config;