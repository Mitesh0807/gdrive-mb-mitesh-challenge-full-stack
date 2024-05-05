import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function PublicAccessTable({
    data
}: { data: { name: string, access: string, shared: number, createdBy: string }[] }) {
    return (
        <>
            <Table>
                <TableCaption>Public Access</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Access</TableHead>
                        <TableHead>Shared</TableHead>
                        <TableHead>Created By</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.access}</TableCell>
                            <TableCell>{item.shared}</TableCell>
                            <TableCell>{item.createdBy}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default PublicAccessTable;