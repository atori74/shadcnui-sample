import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { Button } from "./components/ui/button";
import viteLogo from "/vite.svg";
import { Input } from "./components/ui/input";

interface License {
  licenseNo: string;
  name: string;
  birthDate: string;
  address: string;
  issueDate: string;
}

const dummyApi = (page: number = 1, perPage: number = 5) => {
  const first = perPage * (page - 1) + 1;
  const list = [];
  for (let i = first; i < first + perPage; i++) {
    list.push({
      licenseNo: `${i}`.padStart(8, "0"),
      name: `driver${i}`,
      birthDate: `${(() => {
        const d = new Date("2020/1/1");
        d.setDate(d.getDate() + i - 1);
        return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
      })()}`,
      address: `東京都渋谷区渋谷3-3-${i}`,
      issueDate: `${(() => {
        const d = new Date("2020/1/1");
        d.setFullYear(d.getFullYear() - 5);
        d.setDate(d.getDate() + i - 1);
        return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
      })()}`,
    });
  }
  return list;
};

const LicenseDiaglog = (props: { license: License }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="h-8 w-8 text-black" variant="outline">
          <Ellipsis />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.license.name}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">LicenseNo</TableCell>
              <TableCell>{props.license.licenseNo}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>{props.license.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">birthDate</TableCell>
              <TableCell>{props.license.birthDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Address</TableCell>
              <TableCell>{props.license.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">issueDate</TableCell>
              <TableCell>{props.license.issueDate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const LicenseTable = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLicences = async () => {
      const res = dummyApi(page, 10);
      setLicenses(res);
    };
    fetchLicences();
  }, [page]);

  return (
    <>
      <h1 className="text-4xl font-bold text-left mt-12">Licenses List</h1>
      <Table className="my-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">LicenseNo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>BirthDate</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {licenses.map((license) => (
            <TableRow>
              <TableCell className="font-medium text-left">
                {license.licenseNo}
              </TableCell>
              <TableCell className="text-left">{license.name}</TableCell>
              <TableCell className="text-left">{license.birthDate}</TableCell>
              <TableCell className="text-left">{license.address}</TableCell>
              <TableCell className="text-right">
                <LicenseDiaglog license={license} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(page > 1 ? page - 1 : page);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <Input
              type="number"
              value={page}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPage(parseInt(e.target.value) || page);
              }}
              className="w-16"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <LicenseTable />
    </>
  );
}

export default App;
