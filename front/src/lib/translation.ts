interface Translation {
  [index: string]: {
    form: {
      signup: string
      login: string
      email: string
      name: string
      password: string
      passwordConf: string
      haveAccount: string
      noAccount: string
      requiredMsg: string
      emailMsg: string
      passwordMaxMessage: string
      passwordConfMsg: string
    }
    landing: {
      mottos: {
        first: string
        second: string
        third: string
      }
      main: {
        first: string
        second: string
      }
    }
    sideNav: {
      home: string
      profile: string
      messages: string
      notifications: string
      more: string
      shweet: string
    }
    searchBox: {
      search: string
    }
    trends: {
      title: string
    }
    home: {
      title: string
    }
    tweet: {
      placeholder: string
      submit: string
      sending: string
    }
    logout: {
      exit: string
      addAccount: string
    }
    profile: {
      editButton: string
      follower: string
      following: string
    }
  }
}
// NOTE: I've used following solution. Need more exploration
// https://stackoverflow.com/questions/16320397/detect-user-input-language-javascript
export const isRTL = (s: string): boolean => {
  const ltrChars =
      'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
      '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
    rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
    rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']')

  return rtlDirCheck.test(s)
}

export const translation: Translation = {
  eng: {
    form: {
      signup: 'Sign up',
      login: 'Log in',
      email: 'Email',
      name: 'Name',
      password: 'Password',
      passwordConf: 'Confirm Password',
      haveAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      requiredMsg: 'This is required',
      emailMsg: 'Invalid email address',
      passwordMaxMessage: 'Must be 20 characters or less',
      passwordConfMsg: 'Password must match',
    },
    landing: {
      mottos: {
        first: 'Follow your interests',
        second: 'Hear what people are talking about',
        third: 'Join the conversation',
      },
      main: {
        first: 'Happening Now',
        second: 'Join Shwitter Today',
      },
    },
    sideNav: {
      home: 'Home',
      profile: 'Profile',
      messages: 'Messages',
      notifications: 'Notifications',
      more: 'More',
      shweet: 'Shweet',
    },
    searchBox: {
      search: 'Search Shwitter',
    },
    trends: {
      title: 'Trends for you',
    },
    home: {
      title: 'Home',
    },
    tweet: {
      placeholder: "What's happening",
      submit: 'Shweet',
      sending: 'Sending...',
    },
    logout: {
      exit: 'Log out',
      addAccount: 'Add an existing account',
    },
    profile: {
      editButton: 'Edit profile',
      follower: 'follower',
      following: 'following',
    },
  },
  ir: {
    form: {
      signup: 'ثبت نام',
      login: 'ورود',
      email: 'پست الکترونیک',
      name: 'نام',
      password: 'کلمه عبور',
      passwordConf: 'تایید کلمه عبور',
      haveAccount: 'قبلا ثبت نام کردم؟',
      noAccount: 'ثبت نام نکردی؟',
      requiredMsg: 'این فیلد لازم است',
      emailMsg: 'آدرس ایمیل صحیح نیست',
      passwordMaxMessage: 'کلمه عبور باید ۲۰ کاراکتر و یا کمتر باشد',
      passwordConfMsg: 'کلمه عبور متفاوت است',
    },
    landing: {
      mottos: {
        first: 'علاقه‌ها تو دنبال کن',
        second: 'ببین بقیه چی میگن',
        third: 'در صحبت‌ها شرکت کن',
      },
      main: {
        first: 'اتفاقات همین الان',
        second: 'امروز به شوییتر بپیوند',
      },
    },
    sideNav: {
      home: 'خانه',
      profile: 'پروفایل',
      messages: 'پیام‌ها',
      notifications: 'اخبار',
      more: 'بیشتر',
      shweet: 'شوییت',
    },
    searchBox: {
      search: 'جستجو',
    },
    trends: {
      title: 'اتفاقات داغ',
    },
    home: {
      title: 'خانه',
    },
    tweet: {
      placeholder: 'چه خبره؟',
      submit: 'شوییت',
      sending: 'ارسال...',
    },
    logout: {
      exit: 'خروج',
      addAccount: 'اضافه کردن کاربر جدید',
    },

    profile: {
      editButton: 'ویرایش',
      follower: 'دنبال کننده',
      following: 'دنبال کردن',
    },
  },
}
