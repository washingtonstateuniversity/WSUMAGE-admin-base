<?php
class Wsu_AdminTheme_Block_Adminhtml_Themes_Select extends Mage_Adminhtml_Block_Html_Select
{

    protected function _construct()
    {
        $this->setName('theme')
            ->setId('interface_theme')
            ->setTitle($this->helper('wsu_admintheme')->__('Current Admin Theme'))
            ->setValue(Mage::getStoreConfig('wsu_admintheme/config/theme'))
            ->setOptions($this->_getSelectOptions());
    }

    /*
    * _getSelectOptions
    */
    protected function _getSelectOptions()
    {
        return Mage::getModel('wsu_admintheme/adminhtml_system_config_source_themes')->toOptionArray();
    }
}
