import { useForm } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

export const FormDemo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    console.info('Login data:', data);
  };

  return (
    <section aria-labelledby="login-form-title">
      <h2 id="login-form-title">Login Form Example</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format.',
              },
            })}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: 'Password is required.' })}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <span id="password-error" role="alert">
              {errors.password.message}
            </span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};
