# Source Shield

## Overview

Source Shield is a TypeScript-based tool designed to automatically add copyright notices to your source files. Built exclusively on Bun's native APIs, Source Shield ensures your intellectual property is protected with minimal effort on your part. Ideal for developers and organizations looking to safeguard their work, this tool seamlessly integrates into your development workflow, providing peace of mind through automated copyright management.

## Features

- **Automatic Detection**: Scans your project files for missing copyright notices.
- **Smart Recognition**: Identifies files that already contain copyright notices, preventing duplicate entries.
- **Customizable Notices**: Easily configure copyright notices with your own information.
- **Support for Multiple File Types**: Works with `.js`, `.ts`, `.tsx`, `.css`, and `.html` files.
- **100% Bun Compatible**: Leverages Bun's fast and efficient file processing for optimal performance.
- **CLI Support**: Use it directly from your terminal, integrating seamlessly into your build process.

## Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh) installed on your system to run Source Shield. Bun's fast JavaScript runtime significantly enhances the performance of Source Shield.

### Installation

For general use, it's recommended to install Source Shield globally:

```sh
bun add -g source-shield
```

Alternatively, you can run Source Shield directly using `npx` without installing it:

```sh
bun exec npx source-shield
```

### Usage

After installing globally, you can run Source Shield from anywhere on your system:

```sh
source-shield --fullName="Your Full Name" --email="your.email@example.com"
```

Or, using `npx`:

```sh
npx source-shield --fullName="Your Full Name" --email="your.email@example.com"
```

Replace `Your Full Name` and `your.email@example.com` with your actual name and email address. This information will be included in the copyright notices Source Shield adds to your files.

## Configuration

Customize Source Shield to exclude specific directories or file patterns by modifying the `excludedPatterns` array in the main script. This allows for a more tailored usage according to your project's needs.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Petru Arakiss - @petruarakiss
