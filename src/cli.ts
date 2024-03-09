import { main, type CopyrightNoticeOptions } from './index';
import minimist from 'minimist';

async function cli()
{
    const args = minimist(process.argv.slice(2), {
        string: ['fullName', 'email'],
        alias: { n: 'fullName', e: 'email' },
    });

    await main(args as unknown as CopyrightNoticeOptions);
}

if (import.meta.url === new URL(import.meta.url, 'file:').href) {
    cli().catch((error) =>
    {
        console.error(`❌ Error occurred: ${error.message}`);
    });
}
