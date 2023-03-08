import { Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './PhoneCodeSelect.module.scss';
import { PhoneCodeOption, phoneCodes } from './phone-codes';

const filterOption: SelectProps['filterOption'] = (input, option) =>
  (option?.label || '').toString().toLowerCase().includes(input.toLowerCase());

interface PhoneCodeInputProps {
  onChange?: (option: PhoneCodeOption) => void;
}

const PhoneCodeSelect = ({ onChange }: PhoneCodeInputProps) => {
  const [t] = useTranslation('common');

  const handleChange: SelectProps<string, PhoneCodeOption>['onChange'] = (value, options) => {
    const option = Array.isArray(options) ? options[0] : options;
    onChange?.(option);
  };

  return (
    <Select<string, PhoneCodeOption>
      size="large"
      showSearch
      className={styles.select}
      placeholder={t('auth.countryAndRegion')}
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={filterOption}
      options={phoneCodes}
    />
  );
};

export default PhoneCodeSelect;
