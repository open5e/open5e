<?php

/**
 * Pico dummy plugin - a template for plugins
 *
 * You're a plugin developer? This template may be helpful :-)
 * Simply remove the events you don't need and add your own logic.
 *
 * @author  Daniel Rudolf
 * @link    http://picocms.org
 * @license http://opensource.org/licenses/MIT
 * @version 1.0
 */
final class OpenNav extends AbstractPicoPlugin
{
    /**
     * Triggered after Pico has read its configuration
     *
     * @see    Pico::getConfig()
     * @param  mixed[] &$config array of config variables
     * @return void
     */
     
    public function onConfigLoaded(array &$config)
    {
      $this->settings = $config;
      
      // default id
      if (!isset($this->settings['at_navigation']['id'])) { $this->settings['at_navigation']['id'] = 'at-navigation'; }
      
      // default classes
      if (!isset($this->settings['at_navigation']['class'])) { $this->settings['at_navigation']['class'] = 'at-navigation'; }
      if (!isset($this->settings['at_navigation']['class_li'])) { $this->settings['at_navigation']['class_li'] = 'li-item'; }
      if (!isset($this->settings['at_navigation']['class_a'])) { $this->settings['at_navigation']['class_a'] = 'a-item'; }
      
      // default excludes
      $this->settings['at_navigation']['exclude'] = array_merge_recursive(
        array('single' => array(), 'folder' => array()),
        isset($this->settings['at_navigation']['exclude']) ? $this->settings['at_navigation']['exclude'] : array()
      );
    }

    /**
     * Triggered after Pico has read all known pages
     *
     * See {@link DummyPlugin::onSinglePageLoaded()} for details about the
     * structure of the page data.
     *
     * @see    Pico::getPages()
     * @see    Pico::getCurrentPage()
     * @see    Pico::getPreviousPage()
     * @see    Pico::getNextPage()
     * @param  array[]    &$pages        data of all known pages
     * @param  array|null &$currentPage  data of the page being served
     * @param  array|null &$previousPage data of the previous page
     * @param  array|null &$nextPage     data of the next page
     * @return void
     */
    public function onPagesLoaded(
        array &$pages,
        array &$currentPage = null,
        array &$previousPage = null,
        array &$nextPage = null
    ) {
      $navigation = array();
      
      foreach ($pages as $page)
      {
        if (!$this->at_exclude($page))
        {
          $_split = explode('/', substr($page['url'], strlen($this->settings['base_url'])+1));
          $navigation = array_merge_recursive($navigation, $this->at_recursive($_split, $page, $currentPage));
        }
      }
      
      array_multisort($navigation);
      $this->navigation = $navigation;
    }

    /**
     * Triggered before Pico registers the twig template engine
     *
     * @return void
     */
    public function onTwigRegistration()
    {
        // your code
    }

    /**
     * Triggered before Pico renders the page
     *
     * @see    Pico::getTwig()
     * @see    DummyPlugin::onPageRendered()
     * @param  Twig_Environment &$twig          twig template engine
     * @param  mixed[]          &$twigVariables template variables
     * @param  string           &$templateName  file name of the template
     * @return void
     */
    public function onPageRendering(&$twig, array &$twigVariables, &$templateName)
    {
        $twigVariables['open_nav'] = $this->at_build_navigation($this->navigation, true);
    }

    /**
     * Triggered after Pico has rendered the page
     *
     * @param  string &$output contents which will be sent to the user
     * @return void
     */
    public function onPageRendered(&$output)
    {
        // your code
    }
    
    ##
    #HELPERS
    ##
    
    private function doReturnTest()
    {
      return 'test';
    }
    
    private function at_build_navigation($navigation = array(), $start = false)
    {
      $id = $start ? $this->settings['at_navigation']['id'] : '';
      $class = $start ? $this->settings['at_navigation']['class'] : '';
      $class_li = $this->settings['at_navigation']['class_li'];
      $class_a = $this->settings['at_navigation']['class_a'];
      $child = '';
      $ul = $start ? '<ul id="%s" class="%s">%s</ul>' : '<ul>%s</ul>';
      
      if (isset($navigation['_child']))
      {
        $_child = $navigation['_child'];
        array_multisort($_child);
        
        foreach ($_child as $c)
        {
          $child .= $this->at_build_navigation($c);
        }
        
        $child = $start ? sprintf($ul, $id, $class, $child) : sprintf($ul, $child);
      }
      
      $li = isset($navigation['title'])
        ? sprintf(
          '<li class="%1$s %5$s"><a href="%2$s" class="%1$s %6$s" title="%3$s">%3$s</a>%4$s</li>',
          $navigation['class'],
          $navigation['url'],
          $navigation['title'],
          $child,
          $class_li,
          $class_a
        )
        : $child;
      
      return $li;
    }
    
    
    
    private function at_exclude($page)
    {
      $exclude = $this->settings['at_navigation']['exclude'];
      $url = substr($page['url'], strlen($this->settings['base_url'])+1);
      $url = (substr($url, -1) == '/') ? $url : $url.'/';
      
      foreach ($exclude['single'] as $s)
      {	
        $s = (substr($s, -1*strlen('index')) == 'index') ? substr($s, 0, -1*strlen('index')) : $s;
        $s = (substr($s, -1) == '/') ? $s : $s.'/';
        
        if ($url == $s)
        {
          return true;
        }
      }
      
      foreach ($exclude['folder'] as $f)
      {
        $f = (substr($f, -1) == '/') ? $f : $f.'/';
        $is_index = ($f == '' || $f == '/') ? true : false;
        
        if (substr($url, 0, strlen($f)) == $f || $is_index)
        {
          return true;
        }
      }
      
      return false;
    }
    
    
    
    private function at_recursive($split = array(), $page = array(), $current_page = array())
    {
      $activeClass = (isset($this->settings['at_navigation']['activeClass'])) ? $this->settings['at_navigation']['activeClass'] : 'is-active';
      if (count($split) == 1)
      {			
        $is_index = ($split[0] == '') ? true : false;
        if ($page['title']) {
        $ret = array(
          'title'			=> $page['title'],
          'url'			=> $page['url'],
          'class'			=> ($page['url'] == $current_page['url']) ? $activeClass : ''
        );
      }
      else{
        $exploded_name = explode( "/", $page['url'] );
        $faux_name = $exploded_name[sizeof($exploded_name)-1];
        $ret = array(
          'title'			=> $faux_name,
          'url'			=> $page['url'],
          'class'			=> ($page['url'] == $current_page['url']) ? $activeClass : ''
        );
      }
        
        $split0 = ($split[0] == '') ? '_index' : $split[0];
        return array('_child' => array($split0 => $ret));
        return $is_index ? $ret : array('_child' => array($split[0] => $ret));
      }
      else
      {
        if ($split[1] == '')
        {
          array_pop($split);
          return $this->at_recursive($split, $page, $current_page);
        }
        
        $first = array_shift($split);
        return array('_child' => array($first => $this->at_recursive($split, $page, $current_page)));
      }
    }
    
    
    
    
}
