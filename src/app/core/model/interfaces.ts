import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export interface IPost {
	Author: String;
	Title: String;
	Content: String;
	Tags: String[];
	CreatedAtUtc: Date;
	Comments: IComment[];
}

export interface IComment {
	_id: number;
	commentDate: Date;
	createUser: string;
	text: string;
}

