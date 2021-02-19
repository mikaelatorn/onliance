var rules = {
  name: [
    { required: true, message: 'Name required', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Email required', trigger: 'blur' },
    { type: 'email', message: 'Invalid email address', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Password required', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: 'Password required', trigger: 'blur' },
    { min: 6, message: 'Password should be at least 6 characters', trigger: 'blur' }
  ],
  company: [
    { required: true, message: 'Company name required', trigger: 'blur' }
  ],
  required: [
    { required: true, message: 'This field is required', trigger: 'blur' }
  ]
}

export { rules }
