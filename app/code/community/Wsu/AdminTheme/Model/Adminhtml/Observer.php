<?php
class Wsu_AdminTheme_Model_Adminhtml_Observer
{
    public function setTheme()
    {
        $theme = Mage::getStoreConfig('wsu_admintheme/config/theme');
        Mage::getDesign()->setTheme($theme);
        foreach (array('layout', 'template', 'skin', 'locale') as $type) {
            Mage::getDesign()->setTheme($type, $theme);
        }
    }

    public function cleanConfigCache()
    {
        Mage::helper("storeutilities")->cleanConfigCache();
    }
}
