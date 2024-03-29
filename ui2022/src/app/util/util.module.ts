import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridCheckboxComponent } from './grid-components/grid-checkbox/grid-checkbox.component';
import { GridSelectComponent } from './grid-components/grid-select/grid-select.component';
import {
  GridCartActionsComponent,
  SendReceiptConfirmationDialog,
} from './grid-components/grid-cart-actions/grid-cart-actions.component';
import {
  GridProjectActionsComponent,
  DeleteProjectConfirmationDialog,
} from './grid-components/grid-project-actions/grid-project-actions.component';
import { TextEditorComponent } from './common-components/text-editor/text-editor.component';
import {
  GridContentActionsComponent,
  DeleteContentArticleConfirmationDialog,
} from './grid-components/grid-content-actions/grid-content-actions.component';
import { NoImgBoxComponent } from './common-components/no-img-box/no-img-box.component';
import { GridEventActionsComponent } from './grid-components/grid-event-actions/grid-event-actions.component';
import { PlantbagTreeInputComponent } from './common-components/plantbag-tree-input/plantbag-tree-input.component';
import { PlantbagComponent } from './common-components/plantbag/plantbag.component';
import { UserGridProfileLinkComponent } from './grid-components/user-grid-profile-link/user-grid-profile-link.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent } from './common-components/toolbar/toolbar.component';
import { ButtonComponent } from './common-components/button/button.component';
import { LogoIconComponent } from './common-components/icons/logo-icon/logo-icon.component';
import { BarrelIconComponent } from './common-components/icons/barrel-icon/barrel-icon.component';
import { TreeIconComponent } from './common-components/icons/tree-icon/tree-icon.component';
import { PlantTreeComponent } from './common-components/plant-tree/plant-tree.component';
import { TreeTileComponent } from './common-components/tree-tile/tree-tile.component';
import { PlantingProcessComponent } from './common-components/planting-process/planting-process.component';
import { ShovelIconComponent } from './common-components/icons/shovel-icon/shovel-icon.component';
import { CertificateIconComponent } from './common-components/icons/certificate-icon/certificate-icon.component';
import { OfferAreaComponent } from './common-components/offer-area/offer-area.component';
import { ProjectTileComponent } from './common-components/project-tile/project-tile.component';
import { CircleIconComponent } from './common-components/icons/circle-icon/circle-icon.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MobileMenuComponent } from './common-components/mobile-menu/mobile-menu.component';
import { NewsletterComponent } from './common-components/newsletter/newsletter.component';
import { CarouselItemComponent } from './common-components/carousel-item/carousel-item.component';
import { LightboxGalleryComponent } from './common-components/lightbox-gallery/lightbox-gallery.component';
import { SearchOverlayComponent } from './common-components/search-overlay/search-overlay.component';
import { SideMenuComponent } from './common-components/side-menu/side-menu.component';
import { LeafletMapComponent } from './common-components/leaflet-map/leaflet-map.component';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CaptchaComponent } from './common-components/captcha/captcha.component';
import { ProjectHeaderComponent } from '../pages/project-page/components/project-header/project-header.component';
import { ProjectDescriptionComponent } from '../pages/project-page/components/project-description/project-description.component';
import { PagingComponent } from './common-components/paging/paging.component';
import { ProfileRedeemGiftComponent } from '../pages/profile-page/components/profile-redeem-gift/profile-redeem-gift.component';
import { TeamDetailsComponent } from './common-components/team-details/team-details.component';
import { TeamHeaderComponent } from './common-components/team-header/team-header.component';
import { TeamCreateEditComponent } from './common-components/team-create-edit/team-create-edit.component';
import { PlantproposalPreviewRowComponent } from './common-components/plantproposal-preview-row/plantproposal-preview-row.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CustomPlantingComponent } from '../pages/plant-proposal-page/components/custom-planting/custom-planting.component';
import { CustomPlantTreeInputComponent } from './common-components/custom-plant-tree-input/custom-plant-tree-input.component';
import { CookieConfirmationComponent } from './common-components/cookie-confirmation/cookie-confirmation.component';
import { NotAuthenticatedWarningComponent } from './common-components/not-authenticated-warning/not-authenticated-warning.component';
import { InstagramIconComponent } from './common-components/icons/instagram-icon/instagram-icon.component';
import { YoutubeIconComponent } from './common-components/icons/youtube-icon/youtube-icon.component';
import { FacebookIconComponent } from './common-components/icons/facebook-icon/facebook-icon.component';
import { FooterIconsListComponent } from './common-components/footer-icons-list/footer-icons-list.component';
import { SafeHtmlPipe } from './common-components/safehtml.pipe';

@NgModule({
  declarations: [
    GridCheckboxComponent,
    GridSelectComponent,
    GridCartActionsComponent,
    GridProjectActionsComponent,
    TextEditorComponent,
    DeleteProjectConfirmationDialog,
    GridContentActionsComponent,
    DeleteContentArticleConfirmationDialog,
    NoImgBoxComponent,
    GridEventActionsComponent,
    PlantbagTreeInputComponent,
    PlantbagComponent,
    UserGridProfileLinkComponent,
    ToolbarComponent,
    ButtonComponent,
    LogoIconComponent,
    BarrelIconComponent,
    TreeIconComponent,
    PlantTreeComponent,
    TreeTileComponent,
    PlantingProcessComponent,
    ShovelIconComponent,
    CertificateIconComponent,
    OfferAreaComponent,
    ProjectTileComponent,
    CircleIconComponent,
    FooterComponent,
    MobileMenuComponent,
    SendReceiptConfirmationDialog,
    NewsletterComponent,
    CarouselItemComponent,
    LightboxGalleryComponent,
    SearchOverlayComponent,
    SideMenuComponent,
    LeafletMapComponent,
    CaptchaComponent,
    ProjectHeaderComponent,
    ProjectDescriptionComponent,
    PagingComponent,
    ProfileRedeemGiftComponent,
    TeamDetailsComponent,
    TeamHeaderComponent,
    TeamCreateEditComponent,
    PlantproposalPreviewRowComponent,
    CustomPlantingComponent,
    CustomPlantTreeInputComponent,
    CookieConfirmationComponent,
    NotAuthenticatedWarningComponent,
    InstagramIconComponent,
    YoutubeIconComponent,
    FacebookIconComponent,
    FooterIconsListComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    LeafletModule,
    LeafletDrawModule,
    NgxSliderModule,
    TranslateModule,
    CKEditorModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    TextEditorComponent,
    NoImgBoxComponent,
    PlantbagTreeInputComponent,
    PlantbagComponent,
    TranslateModule,
    ToolbarComponent,
    ButtonComponent,
    LogoIconComponent,
    BarrelIconComponent,
    TreeIconComponent,
    PlantTreeComponent,
    TreeTileComponent,
    PlantingProcessComponent,
    ShovelIconComponent,
    CertificateIconComponent,
    OfferAreaComponent,
    ProjectTileComponent,
    CircleIconComponent,
    FooterComponent,
    MobileMenuComponent,
    NewsletterComponent,
    CarouselItemComponent,
    LightboxGalleryComponent,
    SearchOverlayComponent,
    SideMenuComponent,
    LeafletMapComponent,
    CaptchaComponent,
    ProjectHeaderComponent,
    ProjectDescriptionComponent,
    PagingComponent,
    ProfileRedeemGiftComponent,
    TeamDetailsComponent,
    TeamHeaderComponent,
    TeamCreateEditComponent,
    PlantproposalPreviewRowComponent,
    CustomPlantingComponent,
    CustomPlantTreeInputComponent,
    NotAuthenticatedWarningComponent,
    CookieConfirmationComponent,
    FooterIconsListComponent,
    SafeHtmlPipe
  ],
})
export class UtilModule {}
