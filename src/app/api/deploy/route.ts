export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        const execSync = require('child_process').execSync;

        const output = execSync(`sh ./deploy-ghost-to-flyctl.sh ${name}`, { encoding: 'utf-8' });
        const splitted = output.split(/\r?\n/);
        const filtered = splitted.filter((e: any) => {
            return e !== '';
        });

        return new Response(JSON.stringify({
            message: filtered,
            redirect: `https:\/\/${name}.fly.dev/`,
            success: true,
        }), {
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error, success: false }), {
            headers: { 'content-type': 'application/json' },
        });
    }
}