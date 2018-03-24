import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import * as $ from 'jquery';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements AfterViewInit {
	constructor() {
	}

	ngAfterViewInit(): void {
		let processing = false;
		const element = $('#sidebar');

		$(window).on('resize', function () {
			if (window.innerWidth <= 767) {
				if (!$('body').hasClass('mobile')) {
					$('body').addClass('mobile');
				}
			} else {
				if ($('body').hasClass('mobile')) {
					$('body').removeClass('mobile');
				}
			}
		});

		setTimeout(function () {
			$(window).trigger('resize');

			$('.toggle-sidebar').click(function () {
				if (!$('#sidebar').hasClass('in')) {
					$('#sidebar').addClass('in');
				} else {
					$('#sidebar').addClass('out');
					setTimeout(function () {
						$('#sidebar').removeClass('in out');
					}, 500);
				}
			});

			$('#sidebar').on('mouseenter', function () {
				if ($('body').hasClass('sidebar-visible')) {
					return;
				}

				if (!$('#sidebar').hasClass('in')) {
					$('#sidebar').addClass('in');
				}
			}).on('mouseleave', function () {
				if ($('body').hasClass('sidebar-visible') && !$('body').hasClass('mobile')) {
					return;
				}

				if ($('#sidebar').hasClass('in')) {
					$('#sidebar').addClass('out');
					setTimeout(function () {
						$('#sidebar').removeClass('in out');
					}, 500);
				}
			});

			if ($('body').hasClass('mobile') || (!$('body').hasClass('mobile') && !$('body').hasClass('sidebar-visible'))) {
				$('#sidebar a[ui-sref], body:not(.mobile) > header, footer, div#content-pane').on('click', function (e) {
					$('#sidebar').trigger('mouseleave');
				});
			}

			$('#sidebar a.pin-sidebar').on('click', function (e) {
				e.preventDefault();

				$('body').toggleClass('sidebar-visible');

				return true;
			});
		}, 100);

		$(element).find('li.dropdown > a').click(function (event) {
			event.preventDefault();

			if (processing) {
				return;
			}

			processing = true;

			const e = $(this).parent('li');
			if (!e.hasClass('in')) {
				e.addClass('in');
				e.find('ul.menu').css('height', e.find('ul.menu > li').length * 50 + 'px');
				setTimeout(function () {
					processing = false;
					e.find('ul.menu > li').animate({
						opacity: 1
					}, 200);
				}, 500);
			} else {
				e.find('ul.menu > li').animate({
					opacity: 0
				}, 200);
				setTimeout(function () {
					e.addClass('out');
					e.find('ul.menu').css('height', '0px');
					setTimeout(function () {
						e.removeClass('in out');
						processing = false;
					}, 500);
				}, 200);
			}
		});
	}

}
