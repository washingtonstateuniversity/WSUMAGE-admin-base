<?php
class Wsu_AdminTheme_Adminhtml_ThemeController extends Mage_Adminhtml_Controller_Action
{
    /**
    * Check is allowed access to action
    *
    * @return bool
    */
    protected function _isAllowed()
    {
        return Mage::getSingleton('admin/session')->isAllowed('wsu_admintheme');
    }
    /**
    * changeAction
    *
    */
    public function changeAction()
    {
        $theme = $this->getRequest()->getParam('theme');
        if ($theme) {
            Mage::getConfig()->saveConfig('wsu_admintheme/config/theme', $theme);
            Mage::app()->getCacheInstance()->cleanType('config');
        }
        $this->_redirectReferer();
    }
}
