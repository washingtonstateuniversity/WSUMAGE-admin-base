<?php
class Wsu_AdminTheme_Model_Adminhtml_Observer {
    public function setTheme() {
        $theme = Mage::getStoreConfig('wsu_admintheme/config/theme');
        Mage::getDesign()->setTheme($theme);
        foreach (array('layout', 'template', 'skin', 'locale') as $type) {
            Mage::getDesign()->setTheme($type, $theme);
        }
    }
	//note that we are doing the folder clearing due to the admin html
	//cache not being cleared when you flush the caches.  Need to look into this later
	public function cleanConfigCache(){
		// Init without cache so we get a fresh version
		$cache=Mage::getBaseDir('cache');
		
		$files = glob($cache.'/*/*'); // get all file names
		foreach($files as $file){ // iterate files
		  if(is_file($file)){
			unlink($file); // delete file
		  }
		}
		Mage::getSingleton('core/session')->addSuccess('Saved config cache.');
	}
}