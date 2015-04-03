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
				'lable_html'=> '<i class="fa fa-dashboard"></i>',
				'sort_order' => 0,
				'url' => $dashboard['url'],
				'level' => 0
			);
			if(isset($parentArr['sales']))$parentArr['sales']['lable_html']='<i class="fa fa-dollar" style="margin-right:2px;"></i><span>'.$parentArr['sales']['label'].'</span>';
			if(isset($parentArr['catalog']))$parentArr['catalog']['lable_html']='<i class="fa fa-barcode" style="margin-right:2px;"></i><span>'.$parentArr['catalog']['label'].'</span>';
			if(isset($parentArr['customer']))$parentArr['customer']['lable_html']='<i class="fa fa-group" style="margin-right:2px;"></i><span>'.$parentArr['customer']['label'].'</span>';
			if(isset($parentArr['promo']))$parentArr['promo']['lable_html']='<i class="fa fa-line-chart" style="margin-right:2px;"></i><span>'.$parentArr['promo']['label'].'</span>';
			if(isset($parentArr['newsletter']))$parentArr['newsletter']['lable_html']='<i class="fa fa-volume-up" style="margin-right:2px;"></i><span>'.$parentArr['newsletter']['label'].'</span>';
			if(isset($parentArr['cms']))$parentArr['cms']['lable_html']='<i class="fa fa-list-ul" style="margin-right:2px;"></i><span>'.$parentArr['cms']['label'].'</span>';
			if(isset($parentArr['report']))$parentArr['report']['lable_html']='<i class="fa fa-file-excel-o" style="margin-right:2px;"></i><span>'.$parentArr['report']['label'].'</span>';
			if(isset($parentArr['system']))$parentArr['system']['lable_html']='<i class="fa fa-cogs" style="margin-right:2px;"></i><span>'.$parentArr['system']['label'].'</span>';
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
