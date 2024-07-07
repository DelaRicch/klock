import { CurrencyPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { EmptyComponent } from "@components/shared/empty/empty.component";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { ClientOrders, TableHeader } from "@type/types";
import { cn } from "../../../helpers/helpers";
import { NgxPaginationModule, PaginationInstance } from "ngx-pagination";

@Component({
  selector: "klock-table",
  standalone: true,
  imports: [
    CurrencyPipe,
    NgxPaginationModule,
    SvgIconComponent,
    EmptyComponent
  ],
  templateUrl: "./table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @Input() tableHeaders: TableHeader[] = [];
  @Input() tableData: ClientOrders[] = [];
  @Input() itemsPerPage = 10;
  @Input() title = "";

  cn = cn;

  config: PaginationInstance = {
    id: "klock-table",
    itemsPerPage: this.itemsPerPage,
    currentPage: 1,
    totalItems: this.tableData.length
  };

  ngOnInit(): void {
    console.log(this.tableData);
  }
}
