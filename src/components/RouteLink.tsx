import { useRouter } from 'next/router';

interface RouteLinkProps {
    href: string;
    text: string;
}

function RouteLink({ href, text }: RouteLinkProps) {
    const router = useRouter()

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={e => handleClick(e)}>
            {text}
        </a>
    )
}

export default RouteLink