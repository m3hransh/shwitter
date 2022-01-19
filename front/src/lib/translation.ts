interface Translation {
  [index: string]: {
    form: {
      signUp: string
      email: string
      name: string
      password: string
      passwordConf: string
      haveAccount: string
      requiredMsg: string
      emailMsg: string
      passwordMaxMessage: string
      passwordConfMsg: string
    }
  }
}

export const translation:Translation = {
  eng: {
    form: {
      signUp: 'Sign up',
      email: 'Email',
      name: 'Name',
      password: 'Password',
      passwordConf: 'Confirm Password',
      haveAccount: 'Already have an account?',
      requiredMsg: 'This is required',
      emailMsg: 'Invalid email address',
      passwordMaxMessage: 'Must be 20 characters or less',
      passwordConfMsg: 'Password must match',
    },
  },
  ir: {
    form: {
      signUp: 'ثبت نام',
      email: 'پست الکترونیک',
      name: 'نام',
      password: 'کلمه عبور',
      passwordConf: 'تایید کلمه عبور',
      haveAccount: 'قبلا ثبت نام کردم؟',
      requiredMsg: 'این فیلد لازم است',
      emailMsg: 'آدرس ایمیل صحیح نیست',
      passwordMaxMessage: 'کلمه عبور باید ۲۰ کاراکتر و یا کمتر باشد',
      passwordConfMsg: 'کلمه عبور متفاوت است',
    },
  },
}
