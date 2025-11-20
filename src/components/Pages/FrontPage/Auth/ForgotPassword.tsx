import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { updateFrontPageState } from 'Providers/Redux/Slice'
import Footer from '../Footer'

export default function ForgotPassword() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSendCode = () => {
    // Mock sending code
    console.log('Sending code to', email)
    setStep(2)
  }

  const handleVerifyCode = () => {
    // Mock verifying code
    console.log('Verifying code', code)
    setStep(3)
  }

  const handleResetPassword = () => {
    // Mock resetting password
    console.log(
      'Resetting password for',
      email,
      'with new password',
      newPassword
    )
    // Show success message or redirect
    dispatch(updateFrontPageState({ state: 'auth:login' }))
  }

  const goBackToLogin = () => {
    dispatch(updateFrontPageState({ state: 'auth:login' }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('hud.AuthPage.ForgotPassword.title')}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {t('hud.AuthPage.ForgotPassword.intro')}
          </p>
        </div>

        <div className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('hud.AuthPage.ForgotPassword.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                  placeholder={t('hud.AuthPage.LoginForm.emailPlaceholder')}
                />
              </div>
              <button
                onClick={handleSendCode}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                {t('hud.AuthPage.ForgotPassword.sendCodeButton')}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="code"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('hud.AuthPage.ForgotPassword.codeLabel')}
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                  placeholder="123456"
                />
              </div>
              <button
                onClick={handleVerifyCode}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                {t('hud.AuthPage.ForgotPassword.verifyCodeButton')}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('hud.AuthPage.ForgotPassword.newPasswordLabel')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    <Icon
                      icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                      className="size-5"
                    />
                  </button>
                </div>
              </div>
              <button
                onClick={handleResetPassword}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                {t('hud.AuthPage.ForgotPassword.resetPasswordButton')}
              </button>
            </>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
          </div>

          <button
            onClick={goBackToLogin}
            className="flex w-full items-center justify-center gap-3 p-4 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Icon icon="mdi:arrow-left" />
            {t('hud.AuthPage.ForgotPassword.backToLoginButton')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
