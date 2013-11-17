<?php
class Wsu_AdminTheme_Block_Adminhtml_Menu extends Mage_Adminhtml_Block_Page_Menu {
    public function getMenuArray() {
        //Load standard menu
        $parentArr               = parent::getMenuArray();
		if(Mage::getStoreConfig('wsu_admintheme/config/extendmenu')){
			$dashboard = $parentArr['dashboard'];
			//Prepare "View Sites" menu
			$parentArr['dashboard'] = array(
				'active' => false,
				'lable_html'=> '<i class="icon-dashboard"></i>',
				'sort_order' => 0,
				'url' => $dashboard['url'],
				'level' => 0
			);
			$parentArr['sales']['lable_html']='<i class="icon-dollar" style="margin-right:2px;"></i><span>'.$parentArr['sales']['label'].'</span>';
			$parentArr['catalog']['lable_html']='<i class="icon-barcode" style="margin-right:2px;"></i><span>'.$parentArr['catalog']['label'].'</span>';
			$parentArr['customer']['lable_html']='<i class="icon-group" style="margin-right:2px;"></i><span>'.$parentArr['customer']['label'].'</span>';
			$parentArr['promo']['lable_html']='<i class="icon-tags" style="margin-right:2px;"></i><span>'.$parentArr['promo']['label'].'</span>';
			$parentArr['newsletter']['lable_html']='<i class="icon-volume-up" style="margin-right:2px;"></i><span>'.$parentArr['newsletter']['label'].'</span>';
			$parentArr['cms']['lable_html']='<i class="icon-list-ul" style="margin-right:2px;"></i><span>'.$parentArr['cms']['label'].'</span>';
			$parentArr['report']['lable_html']='<i class="icon-file-alt" style="margin-right:2px;"></i><span>'.$parentArr['report']['label'].'</span>';
			$parentArr['system']['lable_html']='<i class="icon-cogs" style="margin-right:2px;"></i><span>'.$parentArr['system']['label'].'</span>';
		}
		return $parentArr;
	}

	public function getMenuLevel($menu, $level = 0){
		$html = '<ul ' . (!$level ? 'id="nav"' : '') . '>' . PHP_EOL;
		foreach ($menu as $item) {
			$html .= '<li ' . (!empty($item['children']) ? 'onmouseover="Element.addClassName(this,\'over\')" '
				. 'onmouseout="Element.removeClassName(this,\'over\')"' : '') . ' class="'
				. (!$level && !empty($item['active']) ? ' active' : '') . ' '
				. (!empty($item['children']) ? ' parent' : '')
				. (!empty($level) && !empty($item['last']) ? ' last' : '')
				. ' level' . $level . '"> <a href="' . $item['url'] . '" '
				. (!empty($item['title']) ? 'title="' . $item['title'] . '"' : '') . ' '
				. (!empty($item['click']) ? 'onclick="' . $item['click'] . '"' : '') . ' class="'
				. ($level === 0 && !empty($item['active']) ? 'active' : '') . '"><span>'
				. ((!empty($item['lable_html']))?$item['lable_html']:$this->escapeHtml($item['label'])) . '</span></a>' . PHP_EOL;
	 
			if (!empty($item['children'])) {
				$html .= $this->getMenuLevel($item['children'], $level + 1);
			}
			$html .= '</li>' . PHP_EOL;
		}
		$html .= '</ul>' . PHP_EOL;
	 
		return $html;
	} 
	
	
}
