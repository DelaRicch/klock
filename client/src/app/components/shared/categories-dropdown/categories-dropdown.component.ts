import { Component, HostBinding, signal } from "@angular/core";
import { cn } from "../../../helpers/helpers";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "klock-categories-dropdown",
  standalone: true,
  imports: [SvgIconComponent, TitleCasePipe],
  template: `
    <span class="flex items-center gap-6 px-6">
      @for (tab of tabs; track tab.tab) {
        <span
          role="button"
          (click)="setActiveTab(tab.tab)"
          [class]="
            cn(
              'flex items-center gap-2 h-8 relative after:absolute after:bottom-0 after:w-full after:h-[1.5px] after:left-0 after:bg-black after:hidden transition-all duration-200 ease-linear',
              {
                'after:block': activeTab() === tab.tab
              }
            )
          "
        >
          <span class="capitalize">{{ tab.title }}</span>
          <klock-svg-icon
            [class]="cn('transform transition-all duration-200 ease-linear')"
            svgName="short-arrow-down"
          ></klock-svg-icon>
        </span>
      }
    </span>
    <div class="p-8">
      <section class="w-full h-max mx-auto grid grid-cols-3 gap-10 font-normal">
        <div class="flex flex-col gap-3 border-r-[2px]">
          @for (category of categories; track category.id) {
            <span
              role="button"
              (click)="selectCategory(category.name)"
              [id]="category.id"
              >{{ category.name | titlecase }}</span
            >
          }
        </div>

        <div class="grid grid-cols-3 gap-8 col-span-2">
          <div class="flex flex-col gap-1 ml-10 w-max">
            @for (style of stylesCat; track style.id) {
              <span
                role="button"
                (click)="selectWatchType(style.name)"
                [id]="style.id"
                [class]="
                  cn('text-black', {
                    'mb-1.5 pointer-events-none': $index === 0,
                    'text-grey-G500': $index !== 0
                  })
                "
                >{{ style.name | titlecase }}</span
              >
            }
          </div>

          <div class="flex flex-col gap-1">
            @for (use of useCat; track use.id) {
              <span
                role="button"
                (click)="selectWatchType(use.name)"
                [id]="use.id"
                [class]="
                  cn('text-black', {
                    'mb-1.5 pointer-events-none': $index === 0,
                    'text-grey-G500': $index !== 0
                  })
                "
                >{{ use.name | titlecase }}</span
              >
            }
          </div>

          <div class="flex flex-col gap-1">
            @for (trending of trendingCat; track trending.id) {
              <span
                role="button"
                (click)="selectWatchType(trending.name)"
                [id]="trending.id"
                [class]="
                  cn('text-black', {
                    'mb-1.5 pointer-events-none': $index === 0,
                    'text-grey-G500': $index !== 0
                  })
                "
                >{{ trending.name | titlecase }}</span
              >
            }
          </div>
        </div>
      </section>
    </div>
  `
})
export class CategoriesDropdownComponent {
  cn = cn;
  activeTab = signal("men");

  tabs = [
    { tab: "men", title: "men's watches" },
    { tab: "women", title: "women's watches" }
  ];

  categories = [
    { id: 1, name: "new arrivals" },
    { id: 2, name: "best seller" },
    { id: 3, name: "watch brands" },
    { id: 4, name: "shop all" }
  ];

  stylesCat = [
    { id: 11, name: "styles" },
    { id: 12, name: "analog" },
    { id: 13, name: "digital" },
    { id: 14, name: "automatic" }
  ];

  useCat = [
    { id: 111, name: "use" },
    { id: 112, name: "surf & tide" },
    { id: 113, name: "sport and fitness" },
    { id: 114, name: "waterproof/ resistance" }
  ];

  trendingCat = [
    { id: 21, name: "trending" },
    { id: 22, name: "solar watches" },
    { id: 23, name: "sustainable watches" },
    { id: 24, name: "gold watches" },
    { id: 25, name: "stainless steel watches" }
  ];

  @HostBinding("class") get hostClass() {
    return "z-50 flex flex-col py-4 divide divide-y absolute top-[6rem] bg-white  w-[80vw] h-max shadow-small border border-slate-50 rounded-sm";
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  selectCategory(category: string) {
    const transformCategoryToKebab = category.replace(/\s/g, "-").toLowerCase();
    console.log(transformCategoryToKebab);
  }
  selectWatchType(watchType: string) {
    const transformToKebab = watchType
      .replace(/\s*\/\s*|(\s+)(?!$)/g, "-")
      .toLowerCase();
    console.log(transformToKebab);
  }
}
