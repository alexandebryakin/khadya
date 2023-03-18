import { Button, Form, FormProps, Input, InputNumber, InputProps, notification } from 'antd';
import { ExclamationCircleOutline, LeftOutline } from 'antd-mobile-icons';
import cx from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import {
  SendOneTimePasswordMutationVariables,
  Status,
  VerifyOneTimePasswordMutationVariables,
  useSendOneTimePasswordMutation,
  useVerifyOneTimePasswordMutation,
} from '../../api/graphql.types';
import PhoneCodeSelect, { PhoneCodeOption } from '../../components/PhoneCodeSelect';
import Page from '../../layout/mobile/Page';
import { routes } from '../../navigation/routes';
import { useAuth } from '../../providers/AuthProvider';
import styles from './Auth.module.scss';

const FIELDS = {
  code: 'code',
  number: 'number',
};

const Auth = () => {
  return (
    <Page className={styles.page}>
      <AuthForm />
    </Page>
  );
};

export default Auth;

const NUMBER_REGEX = /^\d+$/;

type Step = 'enter-phone' | 'enter-otp';

type StepsController = {
  set: (step: Step) => void;
  current: () => Step;
  phone: {
    set: (variables: SendOneTimePasswordMutationVariables) => void;
    get: () => SendOneTimePasswordMutationVariables | undefined;
  };
};

const useAuthSteps = (): StepsController => {
  const [step, set] = React.useState<Step>('enter-phone');
  const phone = React.useRef<SendOneTimePasswordMutationVariables>();

  return React.useMemo(() => {
    return {
      set,
      current: () => step,
      phone: {
        set: (variables) => (phone.current = variables),
        get: () => phone.current,
      },
    };
  }, [step, set]);
};

interface PhoneFormProps {
  steps: StepsController;
}

const PhoneForm = ({ steps }: PhoneFormProps) => {
  const [t] = useTranslation('common');

  const [form] = Form.useForm<SendOneTimePasswordMutationVariables>();
  const code = Form.useWatch(FIELDS.code, form);

  const onChangePhoneCode = (option: PhoneCodeOption) => {
    form.setFieldValue(FIELDS.code, option.numberCode);
  };

  const [sendOTP] = useSendOneTimePasswordMutation();

  const onFinish: FormProps['onFinish'] = async (variables) => {
    steps.phone.set(variables);
    const response = await sendOTP({ variables });

    if (response.data?.sendOneTimePassword?.status === Status.Success) {
      steps.set('enter-otp');
    } else {
      notification.error({
        message: t('auth.errors.failedToSendOTP'),
      });
    }
  };

  return (
    <div className={styles.phoneForm}>
      <h2 className={styles.welcome}>{t('auth.welcome')}</h2>

      <Form<SendOneTimePasswordMutationVariables>
        name="phone"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={steps.phone.get()}
      >
        <Form.Item
          name={FIELDS.code}
          rules={[{ required: true, message: t('generic.form.rules.fieldRequired').toString() }]}
        >
          <PhoneCodeSelect initialValue={steps.phone.get()?.code} onChange={onChangePhoneCode} />
        </Form.Item>

        <Form.Item
          name={FIELDS.number}
          rules={[{ required: true, message: t('generic.form.rules.fieldRequired').toString() }]}
        >
          <Input size="large" placeholder={t('auth.phoneNumber') || ''} type="number" prefix={code ? `+${code}` : ''} />
        </Form.Item>

        <Form.Item className={styles.weWillTextYou}>
          <span>{t('auth.weWillTextYou')}</span>

          <Link to={'/privacy_policy'}> {t('auth.privacyPolicy')}</Link>
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" block htmlType="submit">
            {t('generic.continue')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

interface OtpFormProps {
  steps: StepsController;
}
const OtpForm = ({ steps }: OtpFormProps) => {
  const [t] = useTranslation('common');

  const [verifyOtp] = useVerifyOneTimePasswordMutation();
  const [otp, setOtp] = React.useState('');
  const [otpError, setError] = React.useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  const onFinish = async (oneTimePassword: VerifyOneTimePasswordMutationVariables['oneTimePassword']) => {
    const phone = steps.phone.get();

    const variables: VerifyOneTimePasswordMutationVariables = {
      oneTimePassword,
      code: phone?.code || '',
      number: phone?.number || '',
    };

    const response = (await verifyOtp({ variables })).data?.verifyOneTimePassword;

    if (response?.status === Status.Success) {
      auth.setUser(response.user);
      auth.saveJWT(response.token);
      navigate(routes.explore()._);
      return;
    }

    const errors = response?.errors;
    if (errors) {
      const ERROR_OTP_INVALID = 'OTP invalid';
      if ((errors.oneTimePassword || []).includes(ERROR_OTP_INVALID)) {
        setError(t('auth.errors.failedToConfirmOTP').toString());
      }
    }
  };

  return (
    <>
      <div className={styles.confirmYourNumber}>
        <span className={styles.controlBox} onClick={() => steps.set('enter-phone')}>
          <LeftOutline className={styles.goBackControl} />
        </span>

        <span>{t('auth.confirmYourNumber')}</span>

        <span className={styles.controlBox} />
      </div>

      <div className={cx(styles.otpFormItem, otpError && styles.otpFormItemError)}>
        <input
          placeholder="------"
          className={styles.otpInput}
          onKeyDown={(e) => {
            const { key } = e;

            const NUMBER_REGEX = /\d/;
            const ALLOWED_KEYS = ['Backspace', 'ArrowLeft', 'ArrowRight'];

            if (!NUMBER_REGEX.test(key) && !ALLOWED_KEYS.includes(key)) e.preventDefault();
          }}
          onChange={(e) => {
            const otp = e.target.value;
            setError('');
            setOtp(otp);
            if (otp.length === 6) {
              onFinish(otp);
              e.preventDefault();
            }
          }}
        />
      </div>

      {otpError && (
        <div className={styles.otpErrorContainer}>
          <ExclamationCircleOutline />

          <span className={styles.otpErrorMessage}>{otpError}</span>
        </div>
      )}

      <div className={styles.otpContinueButton}>
        <Button size="large" type="primary" block disabled={(otp || '').length < 6} onClick={() => onFinish(otp)}>
          {t('generic.continue')}
        </Button>
      </div>
    </>
  );
};

const AuthForm = () => {
  const steps = useAuthSteps();

  const views: Record<Step, React.ReactNode> = {
    'enter-phone': <PhoneForm steps={steps} />,
    'enter-otp': <OtpForm steps={steps} />,
  };

  const view = views[steps.current()];

  return <div className={styles.authForm}>{view}</div>;
};
