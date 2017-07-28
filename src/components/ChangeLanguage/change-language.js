import React, { PropTypes } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

import styles from './change-language.less';

const ChangeLanguage = ({
    translations,
    currentLanguage,
    supportLanguages,
    onMenuClick
}) => {
    const handleMenuClick = ({ key }) => {
        onMenuClick(key);
    };

    const menus = (
        <Menu onClick={handleMenuClick}>
            {supportLanguages.filter(language => language !== currentLanguage).map((language) => {
                return (
                    <Menu.Item key={language}>
                        {language}
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    return (
        <div className={styles.normal}>
            <Dropdown overlay={menus}>
                <a className="ant-dropdown-link">
                    {translations} <Icon type="down" />
                </a>
            </Dropdown>
        </div>
    );
};

ChangeLanguage.defaultProps = {
    supportLanguages: [],
    translations: 'Translations',
    onMenuClick: () => {}
};

ChangeLanguage.propTypes = {
    translations: PropTypes.string,
    currentLanguage: PropTypes.string,
    supportLanguages: PropTypes.array,
    onMenuClick: PropTypes.func.isRequired
};

export default ChangeLanguage;
