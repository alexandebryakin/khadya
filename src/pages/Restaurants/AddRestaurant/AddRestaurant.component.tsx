import { Button, Form, FormProps, Input, notification } from 'antd';
import { DotLoading } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CreateRestaurantMutationVariables, Status, useCreateRestaurantMutation } from '../../../api/graphql.types';
import useToggler from '../../../hooks/useToggler';
import Page from '../../../layout/mobile/Page';
import { routes } from '../../../navigation/routes';

const FIELDS = {
  name: 'name',
};
const RestaurantForm = () => {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<CreateRestaurantMutationVariables>();
  const [createRestaurant, { loading: creating }] = useCreateRestaurantMutation();
  const touched = useToggler();
  const navigate = useNavigate();

  const onFinish: FormProps<CreateRestaurantMutationVariables>['onFinish'] = async (variables) => {
    const response = await createRestaurant({ variables });

    const data = response.data?.createRestaurant;

    if (data?.status === Status.Success) {
      navigate(routes.manage().restaurants(data.restaurant?.id)._);
    } else {
      notification.error({ message: t('restaurants.errors.failedToCreateRestaurant') });
    }
  };

  return (
    <Form<CreateRestaurantMutationVariables>
      name="phone"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFieldsChange={touched.on}
      autoComplete="off"
    >
      <Form.Item
        label={t('restaurants.specifyYourRestaurantsName')}
        name={FIELDS.name}
        requiredMark={'optional'}
        rules={[{ required: true, message: t('generic.form.rules.fieldRequired').toString() }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item>
        <Button size="large" type="primary" block htmlType="submit" disabled={touched.isOff}>
          {creating ? <DotLoading color="white" /> : t('generic.continue')}
        </Button>
      </Form.Item>
    </Form>
  );
};

const AddRestaurant = () => {
  const [t] = useTranslation('common');

  return (
    <div>
      <Page.TopPanel />

      <Page>
        <Page.Header>{t('restaurants.addRestaurant')}</Page.Header>

        <RestaurantForm />
      </Page>
    </div>
  );
};

export default AddRestaurant;
