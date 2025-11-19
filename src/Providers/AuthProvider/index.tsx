function LoginLogic({
  name,
  password,
  email
}: {
  name?: string
  password: string
  email: string
}) {
  console.log('Login logic here', { name, password, email })
}

function RegisterLogic({
  name,
  password,
  email
}: {
  name: string
  password: string
  email: string
}) {
  console.log('Login logic here', { name, password, email })
}

export default { LoginLogic, RegisterLogic }
