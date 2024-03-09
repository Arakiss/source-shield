import { describe, it, expect } from 'bun:test';
import { DEFAULT_COPYRIGHT_NOTICE } from '../src';

describe('DEFAULT_COPYRIGHT_NOTICE', () =>
{
    it('should return a string with the default copyright notice', () =>
    {
        const options = {
            fullName: 'John Doe',
            email: 'johndoe@example.com'
        };
        const commentStyle = {
            start: '/*',
            end: '*/'
        };
        const expected = `/*
 * Copyright (C) ${new Date().getFullYear()} John Doe
 *
 * Author: John Doe <johndoe@example.com>
 *
 * This entire project, including all source code files, is the exclusive
 * property of John Doe and is protected by copyright laws.
 * All rights reserved.
 *
 * The unauthorized reproduction, modification, distribution, or use of
 * any part of this project, without the prior written consent of
 * John Doe, is strictly prohibited.
 *
 * This source code wasn't provided "as is," without express or implied
 * warranties, including, but not limited to, warranties of
 * merchantability, fitness for a particular purpose, or non-infringement.
 * In no event shall John Doe be liable for any damages,
 * including, but not limited to, direct, indirect, special, incidental,
 * or consequential damages, arising out of the use or inability to use
 * this source code.
*/`;
        const result = DEFAULT_COPYRIGHT_NOTICE(options, commentStyle);
        expect(result).toEqual(expected);
    });
});
