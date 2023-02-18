import { Suspense, type JSXElement, type VoidComponent } from "solid-js";
import { A } from "solid-start";
import { useSession } from "~/server/helpers";
import { trpc } from "~/utils/trpc";

const AuthShowcase: VoidComponent = (): JSXElement => {
    const sessionData = useSession();

    return (
        <div class="flex flex-col items-center justify-center gap-4">
            <p class="text-center text-2xl text-white">
                {sessionData() && <span>Logged in as {sessionData()?.user?.name} </span>}
            </p>
            <p class="cursor-pointer rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
                {sessionData() ? "Sign out" : "Sign in"}
            </p>
        </div>
    );
};

const Home: VoidComponent = (): JSXElement => {
    const hello = trpc.example.hello.useQuery(() => ({ name: "CHANGE_ME" }));

    return (
        <main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#9d679c] to-[#aeb2e7]">
            <div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 class="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">KIPRI</h1>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                    <A
                        class="flex max-w-xs flex-col gap-4 border border-[#ff9f1c] rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                        href="https://start.solidjs.com"
                        target="_blank"
                    >
                        <h3 class="text-2xl font-bold"> Solid Start → </h3>
                        <div class="text-lg">Learn more about Solid Start and the basics.</div>
                    </A>
                    <A
                        class="flex max-w-xs flex-col gap-4 border border-[#ff9f1c] rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                        href="https://github.com/orjdev/create-jd-app"
                        target="_blank"
                    >
                        <h3 class="text-2xl font-bold">JD End →</h3>
                        <div class="text-lg">
                            Learn more about Create JD App, the libraries it uses, and how to deploy it
                        </div>
                    </A>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <p class="text-2xl text-white">{hello.data ?? "Loading tRPC query"} </p>
                    <Suspense fallback={<p>Loading...</p>}>
                        <AuthShowcase />
                    </Suspense>
                </div>
            </div>
        </main>
    );
};

export default Home;