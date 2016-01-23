<?php
/**
 * Pico configuration
 *
 * This is the configuration file for {@link Pico}. It comes loaded with the
 * default values, which can be found in {@link Pico::getConfig()} (see
 * {@path "lib/Pico.php"}).
 *
 * To override any of the default settings below, copy this file to
 * {@path "config/config.php"}, uncomment the line, then make and
 * save your changes.
 *
 * @author  Gilbert Pellegrom
 * @link    http://picocms.org
 * @license http://opensource.org/licenses/MIT
 * @version 1.0
 */

/*
 * BASIC
 */
$config['site_title'] = 'open5e';              // Site title
$config['base_url'] = '';                    // Override base URL (e.g. http://example.com)
$config['rewrite_url'] = null;               // A boolean indicating forced URL rewriting

/*
 * THEME
 */
$config['theme'] = 'default';                // Set the theme (defaults to "default")
$config['twig_config'] = array(              // Twig settings
    'cache' => false,                        // To enable Twig caching change this to a path to a writable directory
    'autoescape' => false,                   // Auto-escape Twig vars
    'debug' => false                         // Enable Twig debug
);

/*
 * CONTENT
 */
$config['date_format'] = '%D %T';            // Set the PHP date format as described here: http://php.net/manual/en/function.strftime.php
$config['pages_order_by'] = 'alpha';         // Order pages by "alpha" or "date"
$config['pages_order'] = 'asc';              // Order pages "asc" or "desc"
$config['content_dir'] = 'content/';  // Content directory
$config['content_ext'] = '.md';              // File extension of content files to serve

/* PicoEditor*/
$config['PicoEditor'] = array(
    'enabled'   => true,
    'password'  => '5fdf54742732ade95bea43454485963585589b27d94f42c8cac45db691d7c0bc01339a584f6f03df8e8fa3ffeac50551e1d33116a3a94fbe5c32abe248aeb55b',
    'url'       => 'editzone'
);

/*
 * TIMEZONE
 */
// $config['timezone'] = 'UTC';                 // Timezone may be required by your php install

/*
 * PLUGINS
 */
$config['DummyPlugin.enabled'] = false;      // Force DummyPlugin to be disabled

/*
 * CUSTOM
 */
$config['custom_setting'] = 'Hello';         // Can be accessed by {{ config.custom_setting }} in a theme
