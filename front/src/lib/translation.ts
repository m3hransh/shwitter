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
      main:{
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
  }
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
      noAccount: 'Don\'t have an account?',
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
      main:{
        first: 'Happening Now',
        second: 'Join Shwitter Today'
      }
    },
    sideNav: {
      home: 'Home',
      profile: 'Profile',
      messages: 'Messages',
      notifications: 'Notifications',
      more: 'More',
      shweet: 'Shweet'
    }
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
        second: 'امروز به شوییتر بپیوند'
      }
    },
    sideNav: {
      home: 'خانه',
      profile: 'پروفایل',
      messages: 'پیام‌ها',
      notifications: 'خبر',
      more: 'بیشتر',
      shweet: 'شوییت'
    }
  },
}
