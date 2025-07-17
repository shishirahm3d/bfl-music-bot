module.exports = {
    footer: "শিশির আহমেদ দ্বারা তৈরি | BFL Music",
    ping: {
      description: "বটের লেটেন্সি চেক করুন",
      response: "পিং করা হচ্ছে...",
      embed: {
        title: "বট লেটেন্সি",
        responseTime: "- বট রেসপন্স টাইম : **{latency}ms**",
        websocketPing: "- ওয়েবসকেট পিং : **{ping}ms**",
        uptime: "- আপটাইম : **{uptime}**",
        footer: "শিশির আহমেদ দ্বারা তৈরি | BFL Music"
      }
    },
    addsong: {
      embed: {
          playlistNotFound: "প্লেলিস্ট পাওয়া যায়নি",
          playlistNotFoundDescription: "- প্লেলিস্ট পাওয়া যায়নি।",
          accessDenied: "অ্যাক্সেস নিষেধ",
          accessDeniedDescription: "- এই প্লেলিস্টে গান যোগ করার অনুমতি আপনার নেই।",
          songAdded: "গান যোগ করা হয়েছে",
          songAddedDescription: "- গান **{songInput}** প্লেলিস্ট **{playlistName}** এ যোগ করা হয়েছে।",
          error: "ত্রুটি",
          errorDescription: "- গান যোগ করার সময় একটি ত্রুটি ঘটেছে।"
      }
  },
  allplaylists: {
    embed: {
        noPlaylistsFound: "কোন প্লেলিস্ট পাওয়া যায়নি",
        noPlaylistsFoundDescription: "- বর্তমানে কোন পাবলিক প্লেলিস্ট উপলব্ধ নেই।",
        createdBy: "তৈরি করেছেন: {userId}",
        serverName: "সার্ভার: {serverName}",
        songs: "গান: **{songCount}**",
        publicPlaylistsTitle: "পাবলিক প্লেলিস্ট (পৃষ্ঠা {currentPage}/{totalPages})",
        error: "ত্রুটি",
        errorDescription: "- প্লেলিস্ট আনার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  autoplay: {
    embed: {
        autoplayUpdated: "অটোপ্লে আপডেট হয়েছে",
        autoplayStatus: "- এই সার্ভারের জন্য অটোপ্লে **{status}** করা হয়েছে।",
        enabled: "চালু",
        disabled: "বন্ধ",
        error: "ত্রুটি",
        errorDescription: "- অটোপ্লে আপডেট করার সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescription: "অটোপ্লে চালু বা বন্ধ করুন"
  },
  createplaylist: {
    embed: {
        playlistExists: "প্লেলিস্ট বিদ্যমান",
        playlistExistsDescription: "- এই নামে একটি প্লেলিস্ট ইতিমধ্যে বিদ্যমান।",
        playlistCreated: "প্লেলিস্ট তৈরি হয়েছে",
        playlistCreatedDescription: "- প্লেলিস্ট **{playlistName}** তৈরি করা হয়েছে।\n- দৃশ্যমানতা: **{visibility}**।",
        private: "ব্যক্তিগত",
        public: "পাবলিক",
        error: "ত্রুটি",
        errorDescription: "- প্লেলিস্ট তৈরি করার সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescriptionName: "প্লেলিস্টের নাম লিখুন",
    commandDescriptionPrivate: "প্লেলিস্টকে ব্যক্তিগত হিসেবে সেট করুন (শুধুমাত্র আপনার জন্য দৃশ্যমান)"
  },
  deleteplaylist: {
    embed: {
        playlistNotFound: "প্লেলিস্ট পাওয়া যায়নি",
        playlistNotFoundDescription: "- প্লেলিস্ট পাওয়া যায়নি।",
        accessDenied: "অ্যাক্সেস নিষেধ",
        accessDeniedDescription: "- এই প্লেলিস্ট মুছে ফেলার অনুমতি আপনার নেই।",
        playlistDeleted: "প্লেলিস্ট মুছে ফেলা হয়েছে",
        playlistDeletedDescription: "- প্লেলিস্ট **{playlistName}** মুছে ফেলা হয়েছে।",
        error: "ত্রুটি",
        errorDescription: "- প্লেলিস্ট মুছে ফেলার সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescriptionName: "প্লেলিস্টের নাম লিখুন"
  },
  deletesong: {
    embed: {
        playlistNotFound: "প্লেলিস্ট পাওয়া যায়নি",
        playlistNotFoundDescription: "- প্লেলিস্ট পাওয়া যায়নি।",
        songDeleted: "গান মুছে ফেলা হয়েছে",
        songDeletedDescription: "- গান **{songName}** প্লেলিস্ট **{playlistName}** থেকে মুছে ফেলা হয়েছে।",
        error: "ত্রুটি",
        errorDescription: "- গান মুছে ফেলার সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescriptionPlaylist: "প্লেলিস্টের নাম লিখুন",
    commandDescriptionSong: "গানের নাম লিখুন"
  },
  filters: {
    embed: {
        error: "ত্রুটি",
        noPlayer: "- কোন সক্রিয় প্লেয়ার পাওয়া যায়নি। অনুগ্রহ করে প্রথমে একটি গান চালান।",
        wrongChannel: "- এই কমান্ড ব্যবহার করতে আপনাকে বটের সাথে একই ভয়েস চ্যানেলে থাকতে হবে।",
        filtersCleared: "সব ফিল্টার পরিষ্কার করা হয়েছে।",
        invalidFilter: "অবৈধ ফিল্টার নির্বাচিত।",
        filterApplied: "ফিল্টার **{filter}** প্রয়োগ করা হয়েছে।",
        errorProcessing: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescription: "প্রয়োগ করার জন্য একটি ফিল্টার নির্বাচন করুন"
  },
  help: {
    embed: {
        title: "📜 {botName} হেল্প মেনু",
        author: "সাহায্য",
        description: `
        **{botName} এ স্বাগতম!**

        > ডিসকর্ডে আপনার চূড়ান্ত সংগীত সঙ্গী।
        > নিচে বটের বিস্তারিত তথ্য রয়েছে:
                
        **📂 কমান্ড:** {totalCommands}
        **🌐 সার্ভার:** {totalServers}
        **👥 ব্যবহারকারী:** {totalUsers}
        **⏳ আপটাইম:** {uptimeString}
        **📡 পিং:** {ping}ms
        `,
        availableCommands: "উপলব্ধ কমান্ড",
        noDescription: "কোন বিবরণ উপলব্ধ নেই।",
        noCommands: "কোন কমান্ড পাওয়া যায়নি।",
        error: "❌ হেল্প মেনু আনার সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescription: "বট সম্পর্কে তথ্য পান"
  },
  myplaylists: {
    embed: {
        noPlaylistsFound: "কোন প্লেলিস্ট পাওয়া যায়নি",
        noPlaylistsFoundDescription: "- আপনি কোন প্লেলিস্ট তৈরি করেননি।",
        yourPlaylistsTitle: "আপনার প্লেলিস্ট (পৃষ্ঠা {currentPage}/{totalPages})",
        visibility: "দৃশ্যমানতা",
        private: "ব্যক্তিগত",
        public: "পাবলিক",
        server: "সার্ভার",
        songs: "গান",
        error: "ত্রুটি",
        errorDescription: "- আপনার প্লেলিস্ট আনার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  nowPlaying: {
    embed: {
        error: "ত্রুটি",
        noSong: "- বর্তমানে কোন গান চলছে না।",
        nowPlaying: "এখন চলছে!",
        errorDescription: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  pause: {
    embed: {
        error: "ত্রুটি",
        noActivePlayer: "- কোন সক্রিয় প্লেয়ার পাওয়া যায়নি।",
        paused: "বিরতি!",
        pausedDescription: "**- প্লেব্যাক বিরতি দেওয়া হয়েছে!**",
        errorDescription: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  play: {
    embed: {
        error: "ত্রুটি",
        noVoiceChannel: "- এই কমান্ড ব্যবহার করতে আপনাকে একটি ভয়েস চ্যানেলে থাকতে হবে।",
        noLavalinkNodes: "- অনুরোধ প্রক্রিয়া করার জন্য কোন উপলব্ধ Lavalink নোড নেই।",
        noResults: "- কোন ফলাফল পাওয়া যায়নি।",
        requestUpdated: "অনুরোধ আপডেট হয়েছে!",
        successProcessed: "- আপনার অনুরোধ সফলভাবে প্রক্রিয়া করা হয়েছে।\n- প্লেব্যাক নিয়ন্ত্রণ করতে অনুগ্রহ করে বাটন ব্যবহার করুন",
        errorProcessing: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescription: "গানের নাম / লিংক বা প্লেলিস্ট লিখুন"
  },
  playCustomPlaylist: {
    embed: {
        error: "ত্রুটি",
        noVoiceChannel: "- এই কমান্ড ব্যবহার করতে আপনাকে একটি ভয়েস চ্যানেলে থাকতে হবে।",
        playlistNotFound: "- প্লেলিস্ট পাওয়া যায়নি।",
        accessDenied: "অ্যাক্সেস নিষেধ",
        noPermission: "- এই ব্যক্তিগত প্লেলিস্ট চালানোর অনুমতি আপনার নেই।",
        emptyPlaylist: "- প্লেলিস্ট খালি।",
        playingPlaylist: "প্লেলিস্ট চলছে!",
        playlistPlaying: "- প্লেলিস্ট **{playlistName}** এখন চলছে।\n- প্লেব্যাক নিয়ন্ত্রণ করতে অনুগ্রহ করে বাটন ব্যবহার করুন",
        errorResolvingSong: "- গান সমাধান করতে ত্রুটি।",
        errorPlayingPlaylist: "- প্লেলিস্ট চালানোর সময় একটি ত্রুটি ঘটেছে।"
    },
    commandDescription: "প্লেলিস্টের নাম লিখুন"
  },
  queue: {
    embed: {
        queueEmpty: "কিউ খালি",
        queueEmptyDescription: "- কিউ বর্তমানে খালি। `/play` কমান্ড ব্যবহার করে গান যোগ করুন।",
        currentQueue: "বর্তমান কিউ",
        noMoreSongs: "- কিউতে আর কোন গান নেই।",
        error: "ত্রুটি",
        errorDescription: "- কিউ পুনরুদ্ধার করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  remove: {
    embed: {
        queueEmpty: "কিউ খালি",
        queueEmptyDescription: "- কিউ বর্তমানে খালি। `/play` কমান্ড ব্যবহার করে গান যোগ করুন।",
        invalidPosition: "ত্রুটি",
        invalidPositionDescription: "- অবৈধ অবস্থান। ১ থেকে {queueLength} এর মধ্যে একটি সংখ্যা লিখুন।",
        songRemoved: "গান সরানো হয়েছে",
        songRemovedDescription: "- কিউ থেকে গান সরানো হয়েছে: **{songTitle}**।",
        error: "ত্রুটি",
        errorDescription: "- কিউ থেকে গান সরানোর সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  resume: {
    embed: {
        noActivePlayer: "ত্রুটি",
        noActivePlayerDescription: "- কোন সক্রিয় প্লেয়ার পাওয়া যায়নি।",
        resumed: "পুনরায় শুরু!",
        resumedDescription: "**- প্লেব্যাক পুনরায় শুরু করা হয়েছে!**",
        error: "ত্রুটি",
        errorDescription: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  showsongs: {
    embed: {
        error: "ত্রুটি",
        playlistNotFound: "- প্লেলিস্ট পাওয়া যায়নি।",
        accessDenied: "অ্যাক্সেস নিষেধ",
        noPermission: "- এই ব্যক্তিগত প্লেলিস্ট দেখার অনুমতি আপনার নেই।",
        noSongs: "- এই প্লেলিস্টে কোন গান নেই।",
        songsInPlaylist: "{playlistName} এর গান",
        songsInPlaylistPage: "{playlistName} এর গান (পৃষ্ঠা {currentPage}/{totalPages})",
        errorDescription: "- গান দেখানোর সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  shuffle: {
    embed: {
        queueEmpty: "কিউ খালি",
        queueEmptyDescription: "- কিউ বর্তমানে খালি। `/play` কমান্ড ব্যবহার করে গান যোগ করুন।",
        queueShuffled: "কিউ এলোমেলো করা হয়েছে",
        queueShuffledDescription: "- কিউ সফলভাবে এলোমেলো করা হয়েছে।",
        error: "ত্রুটি",
        errorDescription: "- কিউ এলোমেলো করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  skip: {
    embed: {
        noActivePlayer: "ত্রুটি",
        noActivePlayerDescription: "- কোন সক্রিয় প্লেয়ার পাওয়া যায়নি।",
        songSkipped: "গান স্কিপ করা হয়েছে!",
        songSkippedDescription: "**- প্লেয়ার পরবর্তী গান চালাবে!**",
        error: "ত্রুটি",
        errorDescription: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  stop: {
    embed: {
        noActivePlayer: "ত্রুটি",
        noActivePlayerDescription: "- কোন সক্রিয় প্লেয়ার পাওয়া যায়নি।",
        musicHalted: "সঙ্গীত বন্ধ!",
        musicHaltedDescription: "**- প্লেব্যাক বন্ধ করা হয়েছে এবং প্লেয়ার ধ্বংস করা হয়েছে!**",
        error: "ত্রুটি",
        errorDescription: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  support: {
    embed: {
        authorName: "সাপোর্ট সার্ভার",
        description: "➡️ **সাহায্য এবং আপডেটের জন্য আমাদের ডিসকর্ড সার্ভারে যোগ দিন:**\n- ডিসকর্ড - {supportServerLink}\n\n➡️ **আমাদের ওয়েবসাইট দেখুন:**\n- ওয়েবসাইট - {websiteLink}\n\n➡️ **আমাদের ফলো করুন:**\n- গিটহাব - {githubLink}\n- ইউটিউব - {youtubeLink}\n- ফেসবুক - {facebookLink}",
        error: "ত্রুটি",
        errorDescription: "- আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।"
    }
  },
  volume: {
    embed: {
        noActivePlayer: "ত্রুটি",
        noActivePlayerDescription: "- কোন সক্রিয় প্লেয়ার পাওয়া যায়নি।",
        volumeUpdated: "ভলিউম আপডেট হয়েছে!",
        volumeUpdatedDescription: "- ভলিউম **{volume}%** এ সেট করা হয়েছে",
        error: "ত্রুটি",
        errorDescription: "ভলিউম সেট করার সময় একটি ত্রুটি ঘটেছে।"
    },
    volumeRangeError: "ভলিউম লেভেল ০ থেকে ১০০ এর মধ্যে হতে হবে।"
  },
    errors: {
      noPermission: "এই কমান্ড ব্যবহার করার অনুমতি আপনার নেই।",
      generalError: "- ত্রুটি: {error}"
    }
  };
