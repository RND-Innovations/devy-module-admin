# DeVy Admin Module

Admin module for the **DeVy Framework**.

The Admin module provides the administrative interface, dashboard, and related administration functionality for DeVy applications.

## Requirements

* PHP 8.3+
* DeVy Core `^1.0`

## Installation

The Admin module is installed by the **DeVy Installer**.

It is placed in the application's modules directory:

```text
modules/
└── Admin/
```

Manual installation is not recommended unless you are developing or testing the module.

## Module Structure

The module follows the standard DeVy module structure:

```text
Admin/
├── src/
│   └── ...
├── views/
│   └── ...
├── assets/
│   └── ...
├── module.php
├── composer.json
├── README.md
└── LICENSE
```

## Namespace

The module uses the following PHP namespace:

```php
DeVy\Modules\Admin
```

The physical module directory is:

```text
modules/Admin/
```

The directory name and PHP namespace are intentionally separate.

## Development

Clone the DeVy framework and place this module in:

```text
modules/Admin/
```

After making changes to PHP classes, regenerate Composer's autoloader if necessary:

```bash
composer dump-autoload
```

## Compatibility

| DeVy Core | Admin Module |
| --------- | ------------ |
| 1.x       | 1.x          |

## License

This module is released under the MIT License.

See [LICENSE](LICENSE) for the full license text.

---

**DeVy Framework**
Developed by **RND Innovations**

